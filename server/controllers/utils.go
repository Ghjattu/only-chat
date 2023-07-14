package controllers

import "github.com/gofiber/fiber/v2"

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
