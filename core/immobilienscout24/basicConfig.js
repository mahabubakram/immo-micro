const immo24Configuration = {
  pages: {
    listItem: ".result-list-entry__data"
    , name: "exposes"
    , data: {
      title  : "a"
      , url  : {
        selector: "a"
        , attr  : "href",
        convert: x => {
          if((x !== undefined) && isNaN(x.split('/')[2]) === false) {
            return x;
          }
        }
      }
      , id: {
        selector: "a"
        , attr  : "data-go-to-expose-id"
          }
      , location: ".result-list-entry__address"
      , details : ".grid"
      , price_size: ".font-nowrap"
      , price: {
        selector: ".font-nowrap"
        ,eq: 0
      }
      , size: {
        selector: ".font-nowrap"
        ,eq: 1
      }
      , room: {
        selector: ".font-nowrap"
        ,eq: 2
      }
    }
  }
};

module.exports = {
  getConfiguration : function(){
    return immo24Configuration;
  }
}

