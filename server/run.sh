#!/bin/sh

removeOldDockerImages() {
    old_images=$(docker images --filter "dangling=true" -q --no-trunc)
    if [[ -n "$old_images" ]]; then
        echo "removing old docker images..."
        docker rmi -f $(docker images --filter "dangling=true" -q --no-trunc)
    fi
}

deployLaunchImage() {
    echo "building the launch image..."
    docker build -f Dockerfile.local -t launch .
}

runDockerCompose() {
    docker-compose -f docker-compose.yaml up
}

killDockerProcesses() {
    docker_ps=$(docker ps -q)
    if [[ -n "$docker_ps" ]]; then
        docker kill $(docker ps -q)
    fi
}

main() {
    set -e
    clear
    # -- delete old docker images
    echo "detecting old docker images..."
    removeOldDockerImages
    echo "finished detecting old docker images"
    # -- build new docker images
    echo "building launch dependency pipeline..."
    deployLaunchImage
    echo "pipeline is ready"
    # -- run docker-compose
    echo "running docker compose..."
    runDockerCompose
    echo "docker-compose returned"
    # -- killing remaining docker processes
    echo "killing docker processes..."
    killDockerProcesses
    echo "finished killing docker processes"
}

main