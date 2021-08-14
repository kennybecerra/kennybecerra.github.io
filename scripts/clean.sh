#!/bin/bash
FILE=""
DIR="../dist"
# init
# look for empty dira
if [ -d "$DIR" ]
then
	if [ "$(ls -A $DIR)" ]; then
     $(rm "$DIR" -r *)
	else
    echo "$DIR is Empty"
	fi
else
	echo "Directory $DIR not found."
fi
# rest of the logic