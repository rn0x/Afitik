const saveFile = (blob, fileName, onSuccess, onError) => {
    try {
      if (window.cordova) {
        const fileSystemURL = window.cordova.file.externalRootDirectory;
        window.resolveLocalFileSystemURL(fileSystemURL, (directoryEntry) => {
          directoryEntry.getDirectory('Download', { create: true, exclusive: false }, (downloadDir) => {
            downloadDir.getDirectory('Afitik', { create: true, exclusive: false }, (dir) => {
              dir.getFile(fileName, { create: true, exclusive: false }, (fileEntry) => {
                fileEntry.createWriter((fileWriter) => {
                  fileWriter.onwriteend = () => {
                    onSuccess(`File saved successfully! File path: ${fileEntry.toURL()}`);
                  };
                  fileWriter.onerror = (error) => {
                    console.error('Write error:', error);
                    onError('Failed to save file.');
                  };
                  fileWriter.write(blob);
                }, (error) => {
                  console.error('Error creating file writer:', error);
                  onError('Failed to save file.');
                });
              }, (error) => {
                console.error('Error getting file:', error);
                onError('Failed to save file.');
              });
            }, (error) => {
              console.error('Error getting Afitik directory:', error);
              onError('Failed to create Afitik directory.');
            });
          }, (error) => {
            console.error('Error getting Download directory:', error);
            onError('Failed to create Download directory.');
          });
        }, (error) => {
          console.error('Error resolving local file system URL:', error);
          onError('Failed to resolve file system URL.');
        });
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        onSuccess('File saved successfully!');
      }
    } catch (error) {
      console.error('Error saving file:', error);
      onError('Failed to save file.');
    }
  };
  
  export default saveFile;
  