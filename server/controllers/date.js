const DBInstance = require('../db/dates')
const { handleCommonError, handleCommonResponse } = require('../helpers/responses');

/**
 * Returns all dates from DB
 * @param {*} req
 * @param {*} res
 */
const getDates = async (req, res) => {
  try {
    const dates = await DBInstance.getDates();
    handleCommonResponse(res, { dates });
  } catch (error) {
    handleCommonError(res, error);
  }
};

module.exports = {
  getDates
}