const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);


let stockPortfolioSchema = new Schema({

    portfolioId: {
        type: String,
        required: true,
    },
    
    tickerSymbol :{
        type: String,
        unique: true,
        index: true,
        required: true,
    },

    averageBuyPrice: {
        type: Float,
        required: true,
    },

    noOfShares: {
        type: Number,
        required: true,
    },

    transactionId: {
        type: String,
        required: true,
    },
    transactionTime: { 
        type : Date, 
        default: Date.now 
    },
})


mongoose.model('stockPortfolioModel', stockPortfolioSchema);