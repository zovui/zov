<template>
    <div>
        <button @click="$Notice.info()">info</button> |
        <button @click="$Notice.success()">success</button> |
        <button @click="$Notice.error()">error</button> |
        <button @click="$Notice.warning()">waring</button>
    </div>
</template>
