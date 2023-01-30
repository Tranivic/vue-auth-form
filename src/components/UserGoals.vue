<template>
<div class="user-goals">
    <transition-group tag="ul" name="goals-list">
        <li @click="removeGoal(goal)" v-for="goal in goals" :key="goal">{{ goal }}</li>
    </transition-group>
    <div class="goals-form">
        <input type="text" v-model="newGoal">
        <button @click="addGoal">Add</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            goals: ['Ir ao mercado', 'Estudar Vue', 'Ler um livro', 'Fazer exercícios', ],
            newGoal: '',
        }
    },
    methods: {
        removeGoal(element) {
            let newGoalsList = this.goals.filter(goal => goal !== element);
            this.goals = newGoalsList;
        },
        addGoal() {
            if (this.newGoal === '' || this.goals.includes(this.newGoal)) {
                alert('Goal already exists or is empty')
                return;
            }
            this.goals.unshift(this.newGoal)
            this.newGoal = ''
        },
    },
}
</script>

<style lang="css" scoped>
li {
    background-color: #ccc;
    border: solid 1px #000;
    padding: .5rem;
    width: 15rem;
    cursor: pointer;
    margin-top: 1rem;
}

.goals-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
}

.goals-list-enter-active,
.goals-list-leave-active {
    transition: all .5s;
}

.goals-list-enter-from,
.goals-list-leave-to {
    opacity: 0;
    transform: translateX(50px);
}

.goals-list-enter-to,
.goals-list-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.goals-list-leave-active {
    position: absolute;
}

.goals-list-move {
    transition: all .5s;
}
</style>
