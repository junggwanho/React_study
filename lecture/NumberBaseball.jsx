import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = []
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - 1)), 1)[0];
        array.push(chosen);
    }
    return array;
};

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [], // push 사용하면 안됨 
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries.value, { try: this.state.value, result: '홈런!' }]
            }); 
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else { // 답을 틀렸으면
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) { // 10번 이상 오답시
                this.setState({
                    result: `10번을 넘게 틀려서 실패! 답은 ${asnwer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i += 1){
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                    this.setState({
                        tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                        value: '',
                    });
                }
            }
        }
    };

    onChangeInput = (e) => {

        this.setState({
            value: e.target.value,
        });
    };

    fruits = [
        { fruit: '사과', taste: '맛있다' },
        { fruit: '사과', taste: '맛있다' },
        { fruit: '사과', taste: '맛있다' },
    ]

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 :`} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}


export default NumberBaseball; // import NumberBaseball;
// module.exports
// exports.hello = 'hello'