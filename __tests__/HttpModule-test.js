import 'isomorphic-fetch';
import {Http, HttpAdapter} from 'react-native-http';
import HttpAdapterCorpApp from '../app/http/HttpAdapterCorpApp';

it('default adapter test', () => {
    Http.setAdapter(new HttpAdapter());
    try {
        console.log(Http._commonHeaders(null));
    } catch (e) {
        console.error(e);
        expect(e).toBeDefined();
    }

});

it('corpapp adapter test', () => {
    Http.setAdapter(new HttpAdapterCorpApp());

    let headers = Http._commonHeaders(null);
    let ua = headers.get('useragent');
    console.log(headers.get('useragent'));
    expect(ua).toBe('corpapp');
});