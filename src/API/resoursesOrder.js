import orderApi from 'src/API/orderApi';


const verificarPrecioMayoreo = (prdts, product, rules) => {
  const categoria = product.category.familia.seccion.id;
  const categoriaReglas = rules.find(e => e._category == categoria).rules;
  let model = 0;
  let family = 0;
  let distinct = 0
  let rev;
  if (!categoriaReglas) {
    return false;
  }
  let sameModel = prdts.filter(p => p.id === product.id).reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0);
  let sameFamily = prdts.filter(p => p.category.familia.id === product.category.familia.id).reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0);

  let distin = prdts.filter(p => p.category.familia.seccion.id === product.category.familia.seccion.id && p.id !== product.id).reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0);
  let inx = prdts.findIndex((e) => e.id == product.id);
  if (inx >= 0) {
    model = sameModel
    family = sameFamily
    distinct = distin

  } else {
    model = sameModel + Number(product.pivot.units)
    family = sameFamily + Number(product.pivot.units)
    distinct = distin + Number(product.pivot.units)
  }
  for (const regla of categoriaReglas) {
    if (regla._type === 2) {
      if (regla.sameModel == 1 && model >= regla.min && (!regla.max || model <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && family >= regla.min && (!regla.max || family <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && distinct >= regla.min && (!regla.max || family <= regla.max) && regla.family == 0) {
        return true;
      }
    }
  }
  return false
}

const verificarPrecioDocena = (prdts, product, rules) => {
  const categoria = product.category.familia.seccion.id;
  const categoriaReglas = rules.find(e => e._category == categoria).rules;
  let model = 0;
  let family = 0;
  let distinct = 0
  let rev;
  if (!categoriaReglas) {
    return false;
  }
  let sameModel = prdts.filter(p => p.id === product.id).reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0);
  let sameFamily = prdts.filter(p => p.category.familia.id === product.category.familia.id).reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0);
  let distin = prdts.filter(p => p.category.familia.seccion.id === product.category.familia.seccion.id && p.id !== product.id).reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0);
  let inx = prdts.findIndex((e) => e.id == product.id);
  if (inx >= 0) {
    model = sameModel
    family = sameFamily
    distinct = distin

  } else {
    model = sameModel + Number(product.pivot.units)
    family = sameFamily + Number(product.pivot.units)
    distinct = distin + Number(product.pivot.units)
  }
  for (const regla of categoriaReglas) {
    if (regla._type === 3) {
      if (regla.sameModel == 1 && model >= regla.min && (!regla.max || model <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && family >= regla.min && (!regla.max || family <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && distinct >= regla.min && (!regla.max || family <= regla.max) && regla.family == 0) {
        return true;
      }
    }
  }
  return false
}

const verificarPrecioCaja = (prdts, product) => {
  let model = 0;
  let sameModel = prdts.filter(p => p.id === product.id).reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0);
  model = sameModel + Number(product.pivot.units)
  // console.log(model)
  if (model >= product.pieces) { return true }
  return false
}


const actualizarPreciosProductos = async (products, order, rules) => {
  const productosCambiados = [];
  // console.log(order)
  for (const p of products) {
    // console.log(p)
    const totalPzsTemp = p.pivot._supply_by == 3
      ? (p.pivot.amount * p.pieces)
      : p.pivot._supply_by == 2
        ? (p.pivot.amount * 12)
        : p.pivot.amount;

    let newPriceList = 0;

    if (order.client._price_list <= 3) {
      if (verificarPrecioCaja(products, p, rules)) {
        newPriceList = 4;
      } else if (verificarPrecioDocena(products, p, rules)) {
        newPriceList = 3;
      } else if (verificarPrecioMayoreo(products, p, rules)) {
        newPriceList = 2;
      } else {
        newPriceList = 1;
      }
    } else {
      newPriceList = order.client._price_list;
    }

    const priceData = p.prices.find(e => e.id == newPriceList);

    if (priceData) {
      const precioViejo = p.pivot.price;
      const listaVieja = p.pivot._price_list;

      const nuevoPrecio = priceData.pivot.price;

      if (precioViejo !== nuevoPrecio || listaVieja !== newPriceList) {
        p.pivot._price_list = newPriceList;
        p.pivot.price = nuevoPrecio;
        p.pivot.total = totalPzsTemp * nuevoPrecio;
        productosCambiados.push({
          _order: p.pivot._order,
          _product: p.id,
          _price_list: newPriceList,
          price: nuevoPrecio,
          total: totalPzsTemp * nuevoPrecio
        });
      }
    }
  }
};


const actualizarPreciosProductosSales = async (products, _price_list, rules,) => {
  const productosCambiados = [];

  for (const p of products) {
    // console.log(p)
    const totalPzsTemp = p.pivot.units

    let newPriceList = 0;

    if (_price_list <= 3) {
      if (verificarPrecioCaja(products, p, rules)) {
        newPriceList = 4;
      } else if (verificarPrecioDocena(products, p, rules)) {
        newPriceList = 3;
      } else if (verificarPrecioMayoreo(products, p, rules)) {
        newPriceList = 2;
      } else {
        newPriceList = 1;
      }
    } else {
      newPriceList = _price_list;
    }
    console.log(newPriceList)
    const priceData = p.prices.find(e => e.id == newPriceList);
    // console.log(priceData)
    if (priceData) {
      const precioViejo = p.pivot.price;
      const listaVieja = p.pivot._price_list;

      const nuevoPrecio = priceData.pivot.price;

      if (precioViejo !== nuevoPrecio || listaVieja !== newPriceList) {
        p.pivot._price_list = newPriceList;
        p.pivot.price = nuevoPrecio;
        p.pivot.total = totalPzsTemp * nuevoPrecio;
        productosCambiados.push({
          _product: p.id,
          _price_list: newPriceList,
          price: nuevoPrecio,
          total: totalPzsTemp * nuevoPrecio
        });
      }
    }
  }
};


const totalPiezas = (pivot, pieces) => {
  return pivot.units
}

const aplicarPromociones = (products, promotions) => {
  promotions.forEach(promo => {
    if (promo.type === 'NXM') {
      aplicar2x1(products, promo)
    }
  })
}
const aplicar2x1 = (products, promo) => {
  const promoIds = promo.products.map(p => p._product)

  const items = products.filter(p => promoIds.includes(p.id))
  if (!items.length) return

  items.forEach(p => {
    const units = Number(p.pivot.units)
    const price = Number(p.pivot.price)
    p.pivot.subtotal = units * price
    p.pivot.promo_units = 0
    p.pivot.promo_discount = 0
    p.pivot.total = p.pivot.subtotal
  })
  const totalUnits = items.reduce(
    (sum, p) => sum + Number(p.pivot.units),
    0
  )
  const freeUnits = Math.floor(totalUnits / 2)
  if (freeUnits <= 0) return

  let remaining = freeUnits
  for (const p of items) {
    if (remaining <= 0) break

    const units = Number(p.pivot.units)
    const price = Number(p.pivot.price)

    const freeForProduct = Math.min(units, remaining)

    if (freeForProduct <= 0) continue

    p.pivot.promo_units += freeForProduct
    p.pivot.promo_discount += freeForProduct * price
    p.pivot.total -= freeForProduct * price

    remaining -= freeForProduct
  }
}




export default { verificarPrecioMayoreo, verificarPrecioDocena, actualizarPreciosProductos, actualizarPreciosProductosSales, verificarPrecioCaja, aplicarPromociones }
