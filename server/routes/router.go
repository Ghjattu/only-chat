package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRouter(app *fiber.App) {
	api := app.Group("/api")

	RegisterRouterV1(api)

	// websocket router
	app.Get("/ws/:id/:chatid/:username", controllers.WebSocketHandler)
}

func RegisterRouterV1(r fiber.Router) {
	v1 := r.Group("/v1")

	v1.Post("/register", controllers.Register)
	v1.Post("/login", controllers.Login)
}
