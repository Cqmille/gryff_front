import { Component, h } from '@stencil/core';

@Component({
    tag:'public-not-found',
    shadow: false,
})

export class PublicNotFound {
    render(){
        return (
            <div>
                <p>404 not found</p>
            </div>
        )
    }
}