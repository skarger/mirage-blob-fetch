import Controller from '@ember/controller';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class FetchImageController extends Controller {
  @action
  async fetchBlob() {
    const imageUrl = 'https://salsify-ecdn.com/images/22206eec799809830789313b20b92af1.png';
    
    const result = {
      blob: null,
      mimeType: null,
      error: null
    };
    
    console.log(window.fetch);
    return await fetch(imageUrl)
      .then(response => {
        result.mimeType = response.headers.get('content-type');
        return response.blob();
      })
      .then(body => {
        console.log('raw blob:');
        console.log(body);
        console.log(`raw blob.size: ${body.size}`);
        const typedBlob = new Blob([body], {type: 'image/png'});
        console.log('typed blob:');
        console.log(typedBlob);
        console.log(`typed blob.size: ${typedBlob.size}`);
        result.binary = typedBlob;
        return result;
      })
      .catch(err => {
        result.error = err;
        return result;
      });
  }
}
