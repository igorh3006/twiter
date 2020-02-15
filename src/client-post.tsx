import React, { Component, FunctionComponent } from "react";
import './index.css';

type PostProps = {
    readonly postsArray: ReadonlyArray<{ id: string, text: string }>
    readonly onPostDelete: (id: string) => void
}

// 1. add date with formating using Moment.js libray
// 2. 

const Post: FunctionComponent<PostProps> = (props) => {
    const postsArray = props.postsArray.map(post =>
        <li key={post.id}>
            <button className='post'>{post.text}</button>
            <button className='delete' onClick={() => props.onPostDelete(post.id)}>remove</button>
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
                <button className='add' onClick={this.createPostArray}>ADD</button>
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

    private createPostArray = () => {
        if (this.state.input) {
            this.setState(
                {
                    input: '',
                    postsArray: [...this.state.postsArray, {
                        id: this.postId.toString(),
                        text: this.state.input
                    }]
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