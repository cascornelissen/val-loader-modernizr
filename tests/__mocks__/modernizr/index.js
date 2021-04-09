module.exports = {
    build: jest.fn((options, callback) => callback('modernizr.build')),
    metadata: jest.fn(),
    options: jest.fn()
}
