import fetchMock from 'fetch-mock';

fetchMock.get('http://fake.com', JSON.parse('{"success":true,"code":200,"msg":null,"data":null, "jest": true}'));
fetchMock.get('http://www.pilipa.cn/api/v1', JSON.parse('{"success":true,"code":200,"msg":null,"data":null, "abc": true}'));
// fetchMock.post('*', JSON.parse('{"success":true,"code":200,"msg":null,"data":null, "jest-post": true}'));

it('can fetch', async () => {
    // fetchMock.get('http://fake.com', {hello: "world"});
    console.log("fetch******=", fetch);
    const response = await fetch('http://fake.com');
    const result = await response.json();
    expect(result.success).toEqual(true);
    let return2 = await fetch('http://www.pilipa.cn/api/v1');
    let text = await return2.text();
    console.log("fetch response ******=", text);
    expect(text).toEqual('{"success":true,"code":200,"msg":null,"data":null,"abc":true}');
});