export async function createIframe(parent: ParentNode, content: string, hidden: boolean = true) {
    const iframe = document.createElement('iframe');
    iframe.sandbox.value = 'allow-same-origin';
    iframe.srcdoc = content;
    iframe.width = '100%'
    if (hidden) {
        iframe.style.display = 'none';
    }

    parent.appendChild(iframe);

    await new Promise<void>((res) => {
        iframe.onload = () => {
            res()
        }
    });

    return iframe
}