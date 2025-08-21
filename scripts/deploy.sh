#!/bin/bash

# Source variables from .env file
source .env

# --- Configuration ---
DELETE_EXTENSIONS="html ico pdf css js" # Extensions to delete

# --- Step 1: Delete assets folder and files with specified extensions on remote, log deletions ---
DELETE_CMD="
cd '$REMOTE_DEST_DIR' && \
{ [ -d assets ] && echo 'Deleting folder: assets' && rm -rf assets && echo 'assets/' ; } ; \
find . -maxdepth 1 -type f \\( $(printf -- '-name \"*.%s\" -o ' $DELETE_EXTENSIONS | sed 's/ -o $//') \\) -print -delete
"

ssh "$REMOTE_USER@$REMOTE_HOST" "$DELETE_CMD" > "$LOG_FILE" 2>&1

if [ $? -ne 0 ]; then
    echo "Error: Failed to delete files/folders on remote server. See $LOG_FILE for details."
    exit 1
fi

echo "Deleted files/folders on remote server (logged in $LOG_FILE):"
cat "$LOG_FILE"

# --- Step 2: Copy files to remote (no deletion on remote) ---
rsync -av "$LOCAL_DIR/" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DEST_DIR/"

if [ $? -ne 0 ]; then
    echo "Error: Failed to copy files to remote server."
    exit 1
fi

echo "Files copied successfully!"