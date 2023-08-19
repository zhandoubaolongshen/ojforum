<template>
    <div class="add-question">
      <h1 class="title">新增题目</h1>
      <form >
        <label for="title" class="form-label">题目标题：</label>
        <input type="text" id="title" v-model="title" required class="form-input" />
        <br>
        <br>
        <label class="form-label">难度：</label>
        <br>
        <label v-for="level in difficultyLevels" :key="level" class="radio-label">
            <input type="radio" :value="level" v-model="selectedLevel" class="radio-input" />
            <span class="radio-button"></span>
            {{ level }}
        </label>
        <br>
        <br>
        <label for="options" class="form-label">题目内容：</label>
        <div>
    <textarea v-model="text" placeholder="请输入题目内容"></textarea>
    <label for="title" class="form-label">input:</label>
        <input type="text"  v-model="input" required class="form-input" />
        <br>
        <label for="title" class="form-label">output:</label>
        <input type="text"  v-model="output" required class="form-input" />
        <br>
  </div>
        
        <button type="button" @click="addOption" class="submit-btn">提交</button>
      </form>
    </div>
  </template>
  
  <script>
  import {
   getProblems,postProblem
} from "@/request/api/home.js"
  export default {
    data() {
      return {
        title: '',
        options: [''],
        difficultyLevels: ['简单', '中等', '困难'],
        selectedLevel: '',
        text: '',
        input:'',
        output:''
      };
    },
    methods: {
      addOption() {
        let res=postProblem(this.title,this.selectedLevel,
        this.text,this.input,this.output)
        console.log(res)

        

        res.then(response => {
        const message = response.data.message;
        if (message === '操作成功') {
            // 弹出添加成功的弹窗
            alert('添加成功');
        }
        }).catch(error => {
        console.log(error);
        });
      },  
    }
  };
  </script>
  
  <style scoped>
  textarea {
  width: 520px;
  height: 200px;
  resize: vertical;
}
  .add-question {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;
    margin-top: 50px;
    border-radius: 10px;
    background-color: #f0f0f0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .title {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
  }
  
  .form-label {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }
  
  .form-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
  }
  
  .options-list {
    padding: 0;
    list-style-type: none;
  }
  
  .option-input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 10px;  
  }
  
  .remove-option-btn {
    padding: 6px 12px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: #ff5252;
    color: #fff;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .add-option-btn {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #2196f3;
    color: #fff;
    cursor: pointer;
  }
  
  .submit-btn {
    padding: 12px 20px;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
  }
  
  .submit-btn:hover,
  .remove-option-btn:hover,
  .add-option-btn:hover {
    opacity: 0.8;
    transition: opacity 0.3s;
  }
  .radio-group {
  display: flex;
  align-items: center;
}

.radio-label {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.radio-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-button {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-top: 0px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}

.radio-button:before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 27px;
  height: 27px;
  border-radius: 0%;
  background-color: #00a2ff;
  opacity: 0;
  transition: opacity 0.2s;
}

.radio-input:checked + .radio-button:before {
  opacity: 1;
  transform: scale(1.1);
}

.radio-label:hover .radio-button {
  border-color: #2196f3;
}

.radio-label:hover .radio-button:before {
  opacity: 0.6;
}
  </style>