function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    };
}

const React = {
    createElement
};

const element = (
    <div>
        hello<span>world!</span>
    </div>
);

console.log(element);

function render(vnode, container) {
    // vnode 为字符串时，渲染结果为文本
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        return container.append(textNode);
    }

    const dom = document.createElement(vnode.tag);

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        });
    }

    vnode.children.forEach(child => render(child, dom));

    return container.appendChild(dom);
}

function setAttribute(dom, name, value) {
    // 如果属性名是className，则改回class
    if (name === 'className') name = 'class'

    // 属性名以 on 开头，则是一个事件监听方法
    if (/\on\w+/.test(name)) {
        name = name.toLowerCase()
        dom[name] = value || '';
    } else if (name === 'style') {
        // 如果属性名是 style，则更新 style 对象
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
            }
        }
    } else {
        // 普通属性则直接更新属性
        if (name in dom) {
            dom[name] = value || '';
        }
        if (value) {
            dom.setAttribute(name, value);
        } else {
            dom.removeAttribute(name, value);
        }
    }
}

const ReactDOM = {
    render: (vnode, container) => {
        container.innerH
    }
}
