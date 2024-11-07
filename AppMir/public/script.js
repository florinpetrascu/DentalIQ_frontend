document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const fileInput = document.getElementById('cbctFile');
    const formData = new FormData();
    formData.append('cbct', fileInput.files[0]);
  
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.filename) {
          document.getElementById('downloadSection').style.display = 'block';
          document.getElementById('message').textContent = 'File uploaded successfully!';
          document.getElementById('downloadBtn').onclick = function () {
            window.location.href = `http://localhost:3000/download/${data.filename}`;
          };
        } else {
          document.getElementById('message').textContent = 'File upload failed!';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred.';
      });
  });
  