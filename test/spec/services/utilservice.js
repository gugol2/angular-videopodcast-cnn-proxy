'use strict';

describe('Service: utilService', function () {

  // load the service's module
  beforeEach(module('angularVideopodcastCnnApp'));

  // instantiate service
  var utilService, dataService;
  beforeEach(inject(function (_utilService_, _dataService_) {
    utilService = _utilService_;
    dataService=_dataService_;
  }));

  it('should get the file extension of a valid filename', function () {
    //var
    var fileName= 'video.mp4';

    var fileExtension= utilService.getFileExtension(fileName);
    
    //expects
    expect(fileExtension).toEqual('mp4');
  });

  it('should get the file extension of an invalid filename', function () {
    //var
    var fileName= 'video';

    var fileExtension= utilService.getFileExtension(fileName);
    
    //expects
    expect(fileExtension).toEqual(fileName);
  });


  it('should return the index position of an element in an array if it is contained in such array', function () {
    //var
    var format= 'mp4';
    var videoFormats = dataService.getVideoFormats();
    var position;

    position=utilService.supportVideoExtension(format, videoFormats);
    
    //expects
    expect(position).toBeGreaterThan(-1);
  });

  it('should return -1 if an element is not present in an array', function () {
    //var
    var format= 'html';
    var videoFormats = dataService.getVideoFormats();
    var position;

    position=utilService.supportVideoExtension(format, videoFormats);
    
    //expects
    expect(position).toEqual(-1);
  });

  it('should return the parsed and filtered text', function () {
    //var
    var input= 'A very long text with html embebed. A very long text with html embebed. A very long text with html embebed.'+
    'A very long text with html embebed. A very long text with html embebed. A very long text with html embebed. A very long text with html embebed.'+
    '<div><p><span>This should not be considered</span><span>This should not be considered</span><span>This should not be considered</span>'+
    '<span>This should not be considered</span><span>This should not be considered</span><span>This should not be considered</span></p></div>';
    var out;
    var len= 150 + 3; //three dots

    out=utilService.parseDescription(input);
    
    //expects
    expect(out.length).toBeLessThan(len+1);
  });

  
});
