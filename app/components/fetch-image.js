import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FetchImageComponent extends Component {
  @tracked mirageMimeType = '(unset)';
  @tracked mirageBlobSize = '(unset)';
  @tracked mirageBlobType = '(unset)';
  @tracked mirageError = '';

  @tracked nativeMimeType = '(unset)';
  @tracked nativeBlobSize = '(unset)';
  @tracked nativeBlobType = '(unset)';
  @tracked nativeError = '';

  imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Firefox_Logo%2C_2017.png/581px-Firefox_Logo%2C_2017.png';

  @action
  nativeFetchBlob() {
    window.nativeFetch(this.imageUrl)
      .then(response => {
        this.nativeMimeType = response.headers.get('content-type');
        return response.blob();
      })
      .then(body => {
        console.log('native blob:');
        console.log(body);

        this.nativeBlobSize = body.size;
        this.nativeBlobType = body.type || '(empty string)';
      })
      .catch(err => {
        this.nativeError = err;
      });
  }

  @action
  mirageFetchBlob() {
    window.fetch(this.imageUrl)
      .then(response => {
        this.mirageMimeType = response.headers.get('content-type');
        return response.blob();
      })
      .then(body => {
        console.log('mirage blob:');
        console.log(body);

        this.mirageBlobSize = body.size;
        this.mirageBlobType = body.type || '(empty string)';
      })
      .catch(err => {
        this.mirageError = err;
      });
  }
}

