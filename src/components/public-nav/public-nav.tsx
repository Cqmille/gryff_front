import { Component, h } from '@stencil/core';

@Component({
    tag:'public-nav',
    shadow: false,
})

export class PublicNav {
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