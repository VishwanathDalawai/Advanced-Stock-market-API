const mongoose = require('mongoose');
const shortid = require('shortid');

const logger = require('../libs/loggerLib');
const response = require('../libs/responseLib')
const check = require('../libs/checkLib');

const stockPortfolioM =  require('../models/stockPortfolio');
const stockPortfolioModel = mongoose.model('stockPortfolioModel');


function addToPortfolio(tickerSymbol, avTradePrice, shares){
    return new Promise( (resolve, reject)=>{
        const newTrade = stockPortfolioModel({
            portfolioId: shortid.generate(),
            tickerSymbol: tickerSymbol,
            averageBuyPrice: avTradePrice,
            noOfShares: shares,
        })
        newTrade.save((err, newTrade)=>{
            if(err){
                logger.error(err.message, 'stockPortfolio: addToPortfolio', 10);
                let apiResponse = response.generate(true, 'Failed To execute trade', 500, null);
                reject(apiResponse);
            }else{
                logger.info(newTrade, 'stockPortfolio: addToPortfolio ', 10)
                let apiResponse = response.generate(false, 'Added to portfolio successfully', 200, newTrade)
                resolve(apiResponse);
            }
        }) 
    })
}


module.exports = {
    addToPortfolio,
}




