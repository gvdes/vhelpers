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
    model = sameModel + Number(product.pivot.amountDelivered)
    family = sameFamily + Number(product.pivot.amountDelivered)
    distinct = distin + Number(product.pivot.amountDelivered)
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
    model = sameModel + Number(product.pivot.amountDelivered)
    family = sameFamily + Number(product.pivot.amountDelivered)
    distinct = distin + Number(product.pivot.amountDelivered)
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
  model = sameModel + Number(product.pivot.amountDelivered)
  console.log(model)
  if(model >= product.pieces){ return true}
  return false
}


const actualizarPreciosProductos = async (products, order, rules) => {
  const productosCambiados = [];

  for (const p of products) {
    // console.log(p)
    const totalPzsTemp = p.pivot._supply_by == 3
      ? (p.pivot.amountDelivered * p.pieces)
      : p.pivot._supply_by == 2
        ? (p.pivot.amountDelivered * 12)
        : p.pivot.amountDelivered;

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

  if (productosCambiados.length > 0) {
    const resp = await orderApi.updateProductPrices(productosCambiados);
    console.log(resp)
    if (resp.fail) {
      console.error('Error al actualizar precios:', resp);
    } else {
      console.log('Precios actualizados correctamente');
    }
  }
};


const actualizarPreciosProductosSales = async (products,_price_list, rules,) => {
  const productosCambiados = [];

  for (const p of products) {
    // console.log(p)
    const totalPzsTemp = p.pivot._supply_by == 3
      ? (p.pivot.amountDelivered * p.pieces)
      : p.pivot._supply_by == 2
        ? (p.pivot.amountDelivered * 12)
        : p.pivot.amountDelivered;

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
  return  pivot.amountDelivered
}



export default { verificarPrecioMayoreo, verificarPrecioDocena, actualizarPreciosProductos, actualizarPreciosProductosSales,verificarPrecioCaja }
