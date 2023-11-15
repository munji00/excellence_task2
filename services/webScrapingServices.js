import cheerio from 'cheerio';

export const get_flipkart_mobile_data = (data) => {
    const orgData=[];
    const $ = cheerio.load(data);
        const prodArray = $("._4rR01T")
        const priceArray = $("._25b18c ._30jeq3._1_WHN1")
        const ratings = $(".gUuXy- ._3LWZlK")
        for(let i=0; i<prodArray.length; i++)
        {
            orgData.push({
                mobName:$(prodArray[i]).html(), 
                price:$(priceArray[i]).html(),
                rating:$(ratings[i]).text()
            });
        }
        return orgData;
}


export const get_snapdeal_tshirt = (data) => {
    const orgData=[];
    const $ = cheerio.load(data);
        const prodNames = $(".product-title");
        const prodPrices = $(".lfloat.marR10 .lfloat.product-price")
        const prodDiscount = $(".product-discount>span")
        for(let i=0; i<prodNames.length; i++)
        {
            orgData.push({
                prodName:$(prodNames[i]).html(),
                prodPrice:$(prodPrices[i]).html().split("  ")[1],
                prodDisc:$(prodDiscount[i]).text().split(" ")[0]
            })
        
        }
        return orgData;
}
