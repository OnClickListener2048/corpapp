// 异步等待的测试, 参考: https://github.com/facebook/jest/issues/42
// 注意done参数一定不要漏掉了

test("takes a long time", function(done) {
    // do something
    setTimeout(function() {
        // run your expectation
        expect(0).not.toBe(10);
        done();
    }, 1000);
});

// 简化等效写法
test('real timer ', (done) => {
    setTimeout(function() {
        // run your expectation
        expect(0).toEqual(10);
        done();
    }, 1000);
});