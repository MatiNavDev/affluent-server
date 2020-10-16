const DBInstance = require('../db/users')
const { handleCommonError, handleCommonResponse } = require('../helpers/responses');

/**
 * Returns all users from DB
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const users = await DBInstance.getUsers();
    handleCommonResponse(res, { users });
  } catch (error) {
    handleCommonError(res, error);
  }
};

module.exports = {
  getUsers
}