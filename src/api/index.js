export const get = url => {
    const controller = new AbortController();
    const request = new Request(url, {
        method: 'GET',
        signal: controller.signal
    });

    return [fetch(request).then(response => response.text()), controller];
};
