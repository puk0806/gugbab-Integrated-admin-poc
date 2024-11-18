#!/bin/bash

image_path='src/images'
css_file='dist/icons.css'

function convert_name {
    file_name=$(basename "$1")
    file_name_without_extension="${file_name%.*}"
    dash_replaced="${file_name_without_extension// /-}"

    echo "$dash_replaced"
}

for file in "$image_path"/*; do
    if [ -f "$file" ]; then
        file_name=$(basename "$file")
        file_name="${file_name%.*}"
        file_name="${file_name// /-}"

        {
            echo ".icon--$file_name {"
            echo "background: url(./images/$file_name.svg) no-repeat 50% 50%"
            echo "}"
        } >>"$css_file"
    fi
done
