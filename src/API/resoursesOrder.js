import orderApi from 'src/API/orderApi';


const verificarPrecioMayoreo = (prdts, product, rules) => {
  const categoria = product.category.familia.seccion.id;
  const categoriaReglas = rules.find(e => e._category == categoria).rules;
  let rev;
  if (!categoriaReglas) {
    return false;
  }
  let piezasActuales = Number(product.pivot.units);
  let model = prdts.filter(p => p.id === product.id).reduce((acc, curr) => {
    if (curr.id === product.id) {
      acc + piezasActuales
    }
    return acc + Number(totalPiezas(curr.pivot, curr.pieces));
  }, 0);
  // console.log(model)

  const family = prdts
    .filter(p => p.category.familia.id === product.category.familia.id)
    .reduce((acc, curr) => {
      if (curr.id === product.id) {
        return acc + piezasActuales;
      }
      return acc + Number(totalPiezas(curr.pivot, curr.pieces));
    }, 0);
  const distinct = prdts
    .filter(p =>
      p.category.familia.seccion.id === product.category.familia.seccion.id &&
      p.id !== product.id
    )
    .reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0)
    + piezasActuales;

  for (const regla of categoriaReglas) {
    if (regla._type === 2) {
      if (regla.sameModel == 1 && model >= regla.min && (!regla.max || model <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && family >= regla.min && (!regla.max || family <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && distinct >= regla.min && (!regla.max || distinct <= regla.max) && regla.family == 0) {
        return true;
      }
    }
  }
  return false
}

const verificarPrecioDocena = (prdts, product, rules) => {
  const categoria = product.category.familia.seccion.id;
  const categoriaReglas = rules.find(e => e._category == categoria).rules;
  let rev;
  if (!categoriaReglas) {
    return false;
  }
  const piezasActuales = Number(product.pivot.units);
  const model = prdts
    .filter(p => p.id === product.id)
    .reduce((acc, curr) => {
      if (curr.id === product.id) {
        acc + piezasActuales;
      }
      return acc + Number(totalPiezas(curr.pivot, curr.pieces));
    }, 0);

  const family = prdts
    .filter(p => p.category.familia.id === product.category.familia.id)
    .reduce((acc, curr) => {
      if (curr.id === product.id) {
        return acc + piezasActuales;
      }
      return acc + Number(totalPiezas(curr.pivot, curr.pieces));
    }, 0);
  const distinct = prdts
    .filter(p =>
      p.category.familia.seccion.id === product.category.familia.seccion.id &&
      p.id !== product.id
    )
    .reduce((acc, curr) => acc + Number(totalPiezas(curr.pivot, curr.pieces)), 0)
    + piezasActuales;
  for (const regla of categoriaReglas) {
    if (regla._type === 3) {
      if (regla.sameModel == 1 && model >= regla.min && (!regla.max || model <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && family >= regla.min && (!regla.max || family <= regla.max)) {
        return true;
      }
      if (regla.sameModel == 0 && distinct >= regla.min && (!regla.max || distinct <= regla.max) && regla.family == 0) {
        return true;
      }
    }
  }
  return false
}

const verificarPrecioCaja = (prdts, product) => {
  let piezasActuales = Number(product.pivot.units);
  let model = prdts
    .filter(p => p.id === product.id)
    .reduce((acc, curr) => {
      if (curr.id === product.id) {
        return acc + piezasActuales;
      }
      return acc + Number(totalPiezas(curr.pivot, curr.pieces));
    }, 0);
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

    // if (order.client._price_list <= 3) {
    //   if (verificarPrecioCaja(products, p, rules)) {
    //     newPriceList = 4;
    //   } else if (verificarPrecioDocena(products, p, rules)) {
    //     newPriceList = 3;
    //   } else if (verificarPrecioMayoreo(products, p, rules)) {
    //     newPriceList = 2;
    //   } else {
    //     newPriceList = 1;
    //   }

    const clientPrice = order.client._price_list;
    // console.log(clientPrice)
    if (clientPrice <= 4 && verificarPrecioCaja(products, p, rules)) {
      clientPrice = 4;
    }
    if (clientPrice <= 3 && verificarPrecioDocena(products, p, rules)) {
      clientPrice = 3;
    }
    if (clientPrice <= 2 && verificarPrecioMayoreo(products, p, rules)) {
      clientPrice = 2;
    }
    newPriceList = clientPrice;



    // } else {
    //   newPriceList = order.client._price_list;
    // }

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
  // console.log(products)
  for (const p of products) {
    // console.log(p)
    const totalPzsTemp = p.pivot.units
    // console.log(totalPzsTemp)
    let newPriceList = 0;

   let clientPrice = _price_list;
    // console.log(clientPrice)
    if (clientPrice <= 4 && verificarPrecioCaja(products, p, rules)) {
      clientPrice = 4;
    }
    if (clientPrice <= 3 && verificarPrecioDocena(products, p, rules)) {
      clientPrice = 3;
    }
    if (clientPrice <= 2 && verificarPrecioMayoreo(products, p, rules)) {
      clientPrice = 2;
    }
    newPriceList = clientPrice;

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
    } else if (promo.type === 'COM') {
      aplicarComboExacto(products, promo)
    } else if (promo.type === 'BLOCK') {
      aplicarPrecioPorBloque(products, promo)
    } else if (promo.type === 'ACUMULATED') {
      aplicarAcumulado(products, promo)
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
  const blocks = Math.floor(totalUnits / promo.buy)
  const freeUnits = blocks * (promo.buy - promo.pay)
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

const aplicarComboExacto = (products, promo) => {
  const promoIds = promo.products.map(p => p._product)
  if (!promoIds.length) return
  const items = products.filter(p => promoIds.includes(p.id))
  if (!items.length) return
  if (items.length !== promoIds.length) return // faltan productos
  items.forEach(p => {
    const units = Number(p.pivot.units)
    const price = Number(p.pivot.price)
    p.pivot.subtotal = units * price
    p.pivot.promo_units = 0
    p.pivot.promo_discount = 0
    p.pivot.total = p.pivot.subtotal
  })

  const blocks = Math.min(
    ...items.map(p => Number(p.pivot.units))
  )
  if (blocks <= 0) return
  const freePerBlock = promo.buy - promo.pay // 1
  let remainingFree = blocks * freePerBlock
  const productToDiscount = items.reduce((max, current) =>
    current.id > max.id ? current : max, items[0]
  )
  const price = Number(productToDiscount.pivot.price)
  productToDiscount.pivot.promo_units = remainingFree
  productToDiscount.pivot.promo_discount = remainingFree * price
  productToDiscount.pivot.total -= remainingFree * price
}


const aplicarAcumulado = (products, promo) => {
  const promoIds = promo.products.map(p => p._product)

  const items = products.filter(p => promoIds.includes(p.id))
  if (!items.length) return
  const percentage = Number(promo.percentage || 0)
  let totalAccumulated = 0
  items.forEach(p => {
    const units = Number(p.pivot.units)
    const price = Number(p.pivot.price)
    const subtotal = units * price
    const accumulated = subtotal * (percentage / 100)
    p.pivot.accumulated = accumulated
    totalAccumulated += accumulated
  })
  // console.log('Total acumulado:', totalAccumulated)
}


const aplicarPrecioPorBloque = (products, promo) => {
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

  if (totalUnits < promo.buy) return

  const blocks = Math.floor(totalUnits / promo.buy)

  const normalBlockPrice = promo.buy * Number(items[0].pivot.price)
  const discountPerBlock = normalBlockPrice - promo.block_price

  const totalDiscount = blocks * discountPerBlock

  let remainingUnitsToDiscount = blocks * promo.buy
  let remainingDiscount = totalDiscount

  for (const p of items) {
    if (remainingUnitsToDiscount <= 0) break

    const units = Number(p.pivot.units)
    const price = Number(p.pivot.price)

    const unitsForBlock = Math.min(units, remainingUnitsToDiscount)

    const proportion = unitsForBlock / (blocks * promo.buy)
    const discountShare = totalDiscount * proportion

    p.pivot.promo_units += unitsForBlock
    p.pivot.promo_discount += discountShare
    p.pivot.total -= discountShare

    remainingUnitsToDiscount -= unitsForBlock
    remainingDiscount -= discountShare
  }
}



export default { verificarPrecioMayoreo, verificarPrecioDocena, actualizarPreciosProductos, actualizarPreciosProductosSales, verificarPrecioCaja, aplicarPromociones }
