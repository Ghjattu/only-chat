package main

import (
	"log"
	"server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())

	routes.RegisterRouter(app)

	if err := app.Listen(":8080"); err != nil {
		log.Fatal(err)
	}
}
