## Running the architecture

> `scaffold dev`

## Store environment variables

Open the terminal in the Ticketing folder and run this cmd

> `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=mysuperprivatekey`

Get a list of all the secrets

> `kubectl get secrets`

Get all pods

> `kubectl get pods`

Describe a pod

> `kubectl describe pod auth-depl-5cc8dc854-r57td`
