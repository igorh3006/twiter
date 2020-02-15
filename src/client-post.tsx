import React, { Component, FunctionComponent } from "react";
import './index.css';

type PostProps = {
    readonly postsArray: ReadonlyArray<{ id: string, text: string }>
    readonly onPostDelete: (id: string) => void
}

// 1. Add date with formating using Moment.js libray
// 2. Change posts order
// 3. Add a possibiliy to take a photo(*also allow to load photo from computer)

const Post: FunctionComponent<PostProps> = (props) => {
    const postsArray = props.postsArray.map(post =>
        <li key={post.id}>
            <div className='post-container'>
                <div className='post'>{post.text}</div>
                <button className='delete' onClick={() => props.onPostDelete(post.id)}>remove</button>
                <div className='space'></div>
            </div>
        </li>
    )

    return (
        <ol className='ol'>{postsArray}</ol>
    )
}

type AppState = {
    input: string,
    postsArray: ReadonlyArray<{ id: string, text: string }>
}

export default class App extends Component<{}, AppState> {
    private postId = 0;

    constructor(props: any) {
        super(props)
        this.state = {
            input: '',
            postsArray: []
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='space'></div>
                <textarea
                    className='text'
                    placeholder='add a new POST'
                    value={this.state.input}
                    onChange={this.onChange}
                />
                <button className='add' onClick={this.createPost}>ADD</button>
                <div>____________________________________________________________</div>
                <label className='label'>client POSTS</label>
                <Post postsArray={this.state.postsArray} onPostDelete={this.onPostDelete} />
            </div>
        )
    }
    private onChange = (event: any) => {
        event.preventDefault();
        this.setState({
            input: event.target.value
        })
    }

    private createPost = () => {
        if (this.state.input) {
            this.setState(
                {
                    input: '',
                    postsArray: [{
                        id: this.postId.toString(),
                        text: this.state.input
                    }, ...this.state.postsArray]
                }
            )
            this.postId++
        }
    }

    private onPostDelete = (id: string) => {
        this.setState(
            {
                postsArray: this.state.postsArray.filter(post => post.id !== id)
            }
        )
    }
}