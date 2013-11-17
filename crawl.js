var http = require("http");


function getData(host, path, callback) {
  var options = {
    host: host,
    port: 80,
    path: path,
    method: 'GET'
  };
  var jsonData = '';
  var req = http.request(options, function(res) {
    var allData = '';
    res.on('data', function (chunk) {
      allData += chunk;
    });
    res.on('end', function() {
      jsonData = JSON.parse(allData);
      callback(jsonData);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.end();
}

var base = '/ePOS?form=shared3/textbooks/json/';
var term = '&term=F13';
var end = '&deptSort=ACDEPT_CODE&store=405';


getData('www.purdueu.com', base+'json_books.html&term=F13&dept=AGR&crs=20100&sec=10674', function(returnData){
  console.log(returnData.course);
});

/*getData('www.purdueu.com', base+'json_depts.html'+term+end, function(returnData){

  returnData.depts.forEach(function(entry) {
    var dept = entry.code;
    getData('www.purdueu.com', base+'json_courses.html&department='+dept+term+end, function(returnData){

      returnData.courses.forEach(function(entry) {
        var course = entry.code;
        getData('www.purdueu.com', base+'json_sections.html&department='+dept+'&course='+course+term+end, function(returnData){

            returnData.sections.forEach(function(entry) {
              var section = entry.code;
              section = section.substr(0,5);
              getData('www.purdueu.com', base+'json_books.html&dept='+dept+'&crs='+course+'&sec='+section+term+end, function(returnData){

                  returnData.books.forEach(function(entry) {
                    console.log(entry.course);
                  });

                });

            });

        });

      });

    });

  });

});*/
