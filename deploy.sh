#!/bin/bash
gcloud beta functions deploy gg-function-update-server-capacity --trigger-http --memory=128MB --entry-point=handle
