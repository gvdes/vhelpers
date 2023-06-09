import { vizapi } from "src/boot/axios";

export default{

  index({ dateranges, view, store }){
    let _view = view.id;
    let to = dateranges.to;
    let from = dateranges.from;

    return vizapi.get(`/ciclicos?v=${_view}&store=${store}`).then( done=>done.data ).catch( fail => { return {fail}} );
    // return "Esta es la base";
  },
  find(folio,store){
    return vizapi.get(`/ciclicos/${folio}?store=${store}`).then( done=>done.data ).catch( fail => { return {fail}; } );
  }

}
