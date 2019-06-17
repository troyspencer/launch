FROM gcr.io/cloud-builders/npm AS react_builder
WORKDIR /go/src/github.com/troyspencer/launch
COPY react/package.json react/yarn.lock react/
RUN cd react && yarn --pure-lockfile
COPY react react
RUN cd react && yarn build

FROM gcr.io/cloud-builders/gcloud
WORKDIR /go/src/github.com/troyspencer/launch

COPY server server
COPY cloudbuild-deploy.bash cloudbuild-deploy.bash
COPY --from=react_builder /go/src/github.com/troyspencer/launch/server/dist ./server/dist/
ENTRYPOINT [ "bash", "./cloudbuild-deploy.bash" ]