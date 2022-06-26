<script setup>
import { RouterLink } from 'vue-router'
import IRepository from '../components/icons/explore/IRepository.vue'
import IUser from '../components/icons/explore/IUser.vue'
import IIssue from '../components/icons/explore/IIssue.vue'

</script>

<template>
    <div class="repositories_layout mx-auto dark:bg-black flex justify-center p-10">
        <div>
            <ul>
                <RouterLink to="/explore/repositories" router-link-exact-active exact>
                    <li>
                        <IRepository />
                        <h5>Repositories</h5>
                    </li>
                </RouterLink>
                
                <RouterLink to="/explore/users">
                    <li>
                        <IUser />
                        <h5>Users</h5>
                    </li>
                </RouterLink>

                <RouterLink to="/explore/issues">
                    <li>
                        <IIssue />
                        <h5>Issues</h5>
                    </li>
                </RouterLink>
            </ul>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
ul li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1rem;
    font-size: 0.9em;
    padding: 0.5rem 1.5rem;
    margin-bottom: 0.5rem;
    background: #F6F6F6;
    border: 1px solid transparent;
}
ul li:hover,
ul a.router-link-exact-active li,
ul a.router-link-active li{
    background: #ECF3FC;
    border-color: #5CA2F3;
}

</style>
