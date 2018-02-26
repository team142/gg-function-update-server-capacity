#!/bin/bash
gcloud beta functions deploy gg-function-server-capacity-v1 --trigger-http --memory=128MB --entry-point=handle
