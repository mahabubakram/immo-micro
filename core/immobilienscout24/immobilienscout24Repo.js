const scrapeIt = require('scrape-it');


module.exports = {
  listOfItems: function (itemUrl, fetchConfig) {
    //console.log(fetchConfig)
    return new Promise((resolve) =>{
      scrapeIt(itemUrl, fetchConfig).then(items => {
        resolve(items);
      });
    });
  }
}


