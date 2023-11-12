window.onload = function() {
  var fileList = document.getElementById('fileList');
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var directory = urlParams.get('dir');

  if (directory) {
    var apiUrl = 'https://api.github.com/repos/shadcnui/pubcdn/contents/' + directory;

    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var files = data.filter(function(item) {
          return item.type === 'file';
        });

        var directories = data.filter(function(item) {
          return item.type === 'dir';
        });

        var list = document.createElement('ul');

        directories.forEach(function(dir) {
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          var dirPath = directory + '/' + dir.name;
          var dirUrl = window.location.origin + '?dir=' + dirPath.replace(/^\//, '');
          link.href = dirUrl;
          link.textContent = dir.name + '/';
          link.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = dirUrl;
          });

          var icon = document.createElement('span');
          icon.className = 'mdi mdi-folder icon';

          link.insertBefore(icon, link.firstChild);
          listItem.appendChild(link);
          list.appendChild(listItem);
        });

        files.forEach(function(file) {
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          link.href = window.location.origin + '/' + directory + '/' + file.name;
          link.textContent = file.name;

          var icon = document.createElement('span');
          icon.className = 'mdi mdi-file icon';

          link.insertBefore(icon, link.firstChild);
          listItem.appendChild(link);
          list.appendChild(listItem);
        });

        fileList.appendChild(list);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};