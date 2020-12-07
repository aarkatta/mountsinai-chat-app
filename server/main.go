package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

const Port = "8080"

type Logger struct {
	handler http.Handler
}

type Message struct {
	Name string `json:"name"`
	Text string `json:"text"`
}

type JsonResponse struct {
	Data interface{} `json:"data"`
}

var firstMessage = Message{
	Name: "",
	Text: "",
}

var messages = []*Message{
	&firstMessage,
}

func sendJSON(w http.ResponseWriter, status int, data interface{}) {
	js := &JsonResponse{Data: data}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(js)
}

func GetMessages(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	log.Print("Client ID>>>>>> " + r.Header.Get("client-id"))
	log.Print("client-secret >>>>>> " + r.Header.Get("client-secret"))
	sendJSON(w, http.StatusOK, &messages)
}

func CreateMessage(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	var message Message
	json.NewDecoder(r.Body).Decode(&message)
	messages = append(messages, &message)

	sendJSON(w, http.StatusOK, &message)
}

func (l *Logger) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method, r.URL.Path)
	l.handler.ServeHTTP(w, r)
}

func main() {
	router := httprouter.New()
	router.GET("/api/getMessages", GetMessages)
	router.POST("/api/createMessage", CreateMessage)
	log.Printf("Listening on port %s", Port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", Port), &Logger{handler: router}))
}
