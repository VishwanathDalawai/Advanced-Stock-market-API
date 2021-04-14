const addStockTradeController = require("../controllers/addStockTradeController");
const updateStockTradeController = require("../controllers/updateStockTradeController");
const getTransactionsController = require('../controllers/getTransactionsController');
const getPortfolioController = require('../controllers/getPortfolioController');
const getReturnsController = require('../controllers/getReturnsController');
const deleteStockTradeController = require('../controllers/deleteStockTradeController');

const appConfig = require("../../config/appConfig");

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;

    //swagger for documenting APIs
    
    //It's just the comment for swagger. Remove comments and you will see just 6 lines of code!

    /**
     * @swagger
     * components:
     *   schemas:
     *     Transaction:
     *       type: object
     *       required:
     *         - tickerSymbol
     *         - tradePrice
     *         - noOfShares
     *         - tradeType
     *         - tradeId
     *         - transactionId
     *         - transactionTime
     *       properties:
     *         tickerSymbol:
     *           type: string
     *           description: Name of the security/stock
     *         tradePrice:
     *           type: string
     *           description: Price of the stock
     *         noOfShares:
     *           type: string
     *           description: No. of stocks you want to transact
     *         tradeType:
     *           type: string
     *           description: Buy/Sell call. Please give "buy" to buy stocks and "sell" to sell stocks
     *         tradeId:
     *           type: string
     *           description: Trade Id is returned after a transaction
     *         transactionId:
     *           type: string
     *           description: Id, which keeps track of all the transactions
     *         transactionTime:
     *           type: time
     *           description: Transacted Time
     *       example:
     *         tickerSymbol: TCS
     *         tradePrice: 20
     *         noOfShares: 200
     *         tradeType: buy
     *         tradeId: abD-0YH
     *         transactionId: vpD-0oH
     *         transactionTime: 2021-03-30T13:04:01.962Z
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     Portfolio:
     *       type: object
     *       required:
     *         - tickerSymbol
     *         - tradePrice
     *         - noOfShares
     *         - transactionTime
     *       properties:
     *         tickerSymbol:
     *           type: string
     *           description: Name of the security/stock
     *         tradePrice:
     *           type: string
     *           description: Average buy price of the stock
     *         noOfShares:
     *           type: string
     *           description: No. of stocks in the account
     *         transactionTime:
     *           type: time
     *           description: Latest transacted Time
     *       example:
     *         tickerSymbol: TCS
     *         tradePrice: 20
     *         noOfShares: 200
     *         transactionTime: 2021-03-30T13:04:01.962Z
     */

    //----------------------------------POST METHODS----------------------------------------//
    /**
     * @swagger
     * components:
     *   schemas:
     *     AddTrade:
     *       type: object
     *       required:
     *         - tickerSymbol
     *         - tradePrice
     *         - noOfShares
     *         - tradeType
     *       properties:
     *         tickerSymbol:
     *           type: string
     *           description: Name of the security/stock
     *         tradePrice:
     *           type: string
     *           description: Price of the stock
     *         noOfShares:
     *           type: string
     *           description: No. of stocks you want to transact
     *         tradeType:
     *           type: string
     *           description: buy/sell call. Please give "buy" to buy stocks and "sell" to sell stocks
     *       example:
     *         tickerSymbol: TCS
     *         tradePrice: 20
     *         noOfShares: 200
     *         tradeType: buy
     */

    /**
     * @swagger
     * /api/v1/addTrade:
     *   post:
     *     summary:  Add trade - Can be buy or sell call only
     *     requestBody: 
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *         $ref: '#/components/schemas/AddTrade'
     *     responses:
     *       200:
     *         description: Trade executed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: Object
     *               properties:
     *                tradeID:
     *                 type: string
     *                 description: Trade Id of the current transacation
     *               example:
     *                tradeID: AYh-ioa
     *       406:
     *         description: Parameters are missing. Please check / Trade type can be only sell or buy / No of shares should be greater than 0 / Trade price should be greater than 0
     *       500:
     *         description: Failed To execute trade
     */

    app.post(baseUrl + '/addTrade', addStockTradeController.addTrade);

    // //----------------------------------GET METHODS----------------------------------------//

    /**
     * @swagger
     * /api/v1/getTransactions:
     *   get:
     *     summary: Fetch all the transactions
     *     responses:
     *       200:
     *         description: Transaction Details Found
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Transaction'
     *       404:
     *         description: No Transactions Found
     *       500:
     *         description: Failed To fetch transactions
     */
    app.get(baseUrl + '/getTransactions', getTransactionsController.getTransaction);

    /**
     * @swagger
     * /api/v1/getPortfolio:
     *   get:
     *     summary: Fetch Portfolio
     *     responses:
     *       200:
     *         description: Portfolio Found
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Portfolio'
     *       404:
     *         description: No Transactions Found
     *       500:
     *         description: Failed To fetch transactions
     */
    app.get(baseUrl + '/getPortfolio', getPortfolioController.getPortfolio);

    /**
     * @swagger
     * /api/v1/getReturns:
     *   get:
     *     summary: Total returns
     *     responses:
     *       200:
     *         description: Portfolio Found
     *         content:
     *           application/json:
     *             schema:
     *               type: Object
     *               properties:
     *                Total returns:
     *                 type: number
     *                 description: Total returns at the current price of Rs.100
     *               example:
     *                Total returns: 1800
     *       404:
     *         description: No Transactions Found
     *       500:
     *         description: Failed To find transactions
     */
    app.get(baseUrl + '/getReturns', getReturnsController.getReturns);

    // //----------------------------------PUT METHOD----------------------------------------//
        /**
     * @swagger
     * components:
     *   schemas:
     *     EditTrade:
     *       type: object
     *       required:
     *         - tickerSymbol
     *         - tradePrice
     *         - noOfShares
     *         - tradeType
     *         - tradeId
     *       properties:
     *         tickerSymbol:
     *           type: string
     *           description: Name of the security/stock
     *         tradePrice:
     *           type: string
     *           description: Price of the stock
     *         noOfShares:
     *           type: string
     *           description: No. of stocks you want to transact
     *         tradeType:
     *           type: string
     *           description: buy/sell call. Please give "buy" to buy stocks and "sell" to sell stocks
     *         tradeId:
     *           type: string
     *           description: Trade Id of the transaction that you want to edit
     *       example:
     *         tickerSymbol: TCS
     *         tradePrice: 20
     *         noOfShares: 200
     *         tradeType: buy
     *         tradeId: vD0opa-
     */



    /**
     * @swagger
     * /api/v1/editTransaction:
     *   put:
     *     summary: Edit transaction with tradeId - Please Note- You can only update newly added stocks or the latest transactions w.r.t that stock
     *     requestBody: 
     *      required: true
     *      content:
     *       application/json:
     *        schema:
     *         $ref: '#/components/schemas/EditTrade'
     *     responses:
     *       200:
     *         description: Trade details updated
     *         content:
     *           application/json:
     *             schema:
     *               type: Object
     *               properties:
     *                tradeID:
     *                 type: string
     *                 description: Trade Id of the current transacation
     *               example:
     *                tradeID: AYh-ioa
     *       406:
     *         description: Parameters are missing. Please check / Trade type can be only sell or buy / No of shares should be greater than 0 / Trade price should be greater than 0
     *       404:
     *          description: No Transactions Found      
     *       500:
     *         description: Failed to fetch transactions
     */

    app.put(baseUrl + '/editTransaction', updateStockTradeController.editTransaction);

    // //----------------------------------DELETE METHOD----------------------------------------//

    /**
     * @swagger
     * /api/v1/deleteTransaction:
     *   delete:
     *     summary: Delete the transaction by tradeId
     *     requestBody: 
     *      required: true
     *      content:
     *       application/json:
     *         schema:
     *           type: Object
     *           properties:
     *            tradeID:
     *             type: string
     *             description: Trade Id of the current transacation
     *           example:
     *            tradeID: AYh-ioa
     *     responses:
     *       200:
     *         description: Trade executed successfully
     *       404:
     *         description: Specified Trade Id doesnot exist
     *       500:
     *         description: Failed To execute trade
     */


    app.delete(baseUrl + '/deleteTransaction', deleteStockTradeController.deleteTransaction);

}


module.exports = {
    setRouter: setRouter
}