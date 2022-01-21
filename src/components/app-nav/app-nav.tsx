import { Component, h } from '@stencil/core';

@Component({
    tag:'app-nav',
    shadow: false,
})

export class AppNav {
    render(){
        return (
            <div>
                <button type="button" class="btn btn-primary">Primary</button>
                <button type="button" class="btn btn-primary">Primary</button>
                <button type="button" class="btn btn-primary">Primary</button>
            </div>
        )
    }
}