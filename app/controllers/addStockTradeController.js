const mongoose = require('mongoose');
const shortid = require('shortid');

const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');

const check = require('../libs/checkLib');
const stockPortfolioM =  require('../models/stockPortfolio');
const stockPortfolioModel = mongoose.model('stockPortfolioModel');
const stockPortfolio = require('../service/stockPortfolioService');

//----------------------------ADD TRADE -----------------------------------//

let addTrade = (req, res) =>{
    
    let validateTrade = () =>{
        return new Promise((resolve, reject)=>{
            if(check.isEmpty(req.body.tickerSymbol) || check.isEmpty(req.body.tradePrice) || check.isEmpty(req.body.noOfShares) || check.isEmpty(req.body.tradeType)) {
                let apiResponse = response.generate(true, 'Parameters are missing. Please check', 406, null);
                // res.send(apiResponse);
                reject(apiResponse);
            }
            //have several checks for req.body

            //else, resolve request
            else{
                resolve(req)
            }    
        })
    }//end of validateTrade

    let saveTrade = () =>{
        return new Promise( (resolve, reject)=>{
            let newTradeDetails={
                newSymbol: req.body.tickerSymbol,
                newTradePrice: req.body.tradePrice,
                newShares: req.body.noOfShares
            }
            //search tickerSymbol in Portfolio collection
            stockPortfolioModel.find({tickerSymbol:newTradeDetails.newSymbol})
            .lean()
            .exec((err,result)=>{
                if(err){
                    logger.error(err.message, 'addStockTradeController: getTradeByName', 10)
                    let apiResponse = response.generate(true, 'Failed To Find stock in portfolio', 500, null)
                    res.send(apiResponse)   
                }else if (check.isEmpty(result)){
                    // Stock does not exist in portfolio collection
                    logger.error(err.message, 'addStockTradeController: getTradeByName', 10)
                    let apiResponse = response.generate(true, 'Stock not found in portfolio', 404, null)
                    //add stock and return trade executed successfully
                    res.send(apiResponse) 
                }else{
                    //Stock exists in portfolio collection
                    //add no of shares, calculate av price and return trade executed successfully
                    const apiResponse = response.generate(false, 'Trade executed successfully', 200, resp)
                    res.send(apiResponse)
                }
            })
        })
    } 
    validateTrade(req, res)
    .then(saveTrade)
    .then((resolve)=>{
        let apiResponse = response.generate(false, 'Trade executed successfully', 200, resolve)
        res.send(apiResponse)
    })
    .catch((err)=>{
        logger.error(err.message, 'addStockTradeController: AddTrade', 10);
        let apiResponse = response.generate(true, 'Failed To Save Trade', 500, null);
        res.send(err)
    })

}//end of add trade

//---------------------------------END OF ADD TRADE -------------------------------------//

module.exports = {
    addTrade,
}