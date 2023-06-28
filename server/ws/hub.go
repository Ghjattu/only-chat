package ws

import (
	"log"
	"server/models"
)

// Hub contains all of the channels we need for concurrent communication,
// and a map which saves all online clients.
// The MsgQueue receives messages from all clients for subsequent forwarding work.
type Hub struct {
	OnlineClients map[*Client]bool
	MsgQueue      chan *models.Message
	Register      chan *Client
	Unregister    chan *Client
}

// NewHub instantiates and returns a new Hub.
//
//	@param size int "the size of MsgQueue channel"
//	@return *Hub
func NewHub(size int) *Hub {
	hub := &Hub{
		OnlineClients: make(map[*Client]bool),
		MsgQueue:      make(chan *models.Message, size),
		Register:      make(chan *Client),
		Unregister:    make(chan *Client),
	}

	return hub
}

// Start constantly listens for anything passed to any of Hub's channels
// and then, if anything is received into one of these channels, it’ll act accordingly.
//
//	@receiver hub
func (hub *Hub) Start() {
	for {
		select {
		case client := <-hub.Register:
			hub.OnlineClients[client] = true
			log.Println("online clients: ", len(hub.OnlineClients))
		case client := <-hub.Unregister:
			delete(hub.OnlineClients, client)
			log.Println("online clients: ", len(hub.OnlineClients))
		case message := <-hub.MsgQueue:
			hub.DistributeMessage(message)
		}
	}
}

// DistributeMessage receives messages in MsgQueue channel and
// sends them to specific clients based on message type.
//
//	@receiver hub
//	@param message *models.Message
func (hub *Hub) DistributeMessage(message *models.Message) {
	// If the receiving client of the message is online,
	// then send the message over the websocket connection.
	for client := range hub.OnlineClients {
		if client.ChatID == message.To {
			client.Conn.WriteJSON(message)

			return
		}
	}

	log.Println(message)
	//TODO: if offline...
}
