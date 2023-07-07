package controllers

import (
	"server/models"
	"server/utils"

	"github.com/gofiber/fiber/v2"
)

// getID gets an unsigned integer from the route parameters.
// If the parameter is not found or cannot be converted to an integer,
// it will return 0 and an error.
//
//	@param c *fiber.Ctx
//	@param key string
//	@return uint
//	@return error
func getID(c *fiber.Ctx, key string) (uint, error) {
	id, _ := c.ParamsInt(key, 0)
	if id <= 0 {
		return 0, fiber.NewError(fiber.StatusBadRequest, "bad request")
	}

	return uint(id), nil
}

func GetAllFriends(c *fiber.Ctx) error {
	id, err := getID(c, "id")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	friends, err := models.GetAllFriendsByID(id)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    friends,
	})
}

func AddFriend(c *fiber.Ctx) error {
	id1, err := getID(c, "id1")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	id2, err := getID(c, "id2")
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	err = models.AddFriend(id1, id2)
	if err != nil {
		return utils.ErrorHandler(c, err)
	}

	return c.JSON(utils.Response{
		Success: true,
		Code:    fiber.StatusOK,
		Message: "success",
		Data:    nil,
	})
}
