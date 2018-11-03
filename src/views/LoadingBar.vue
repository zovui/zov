<template>
    <div>
        <button @click="$LoadingBar.start()">start</button> |
        <button @click="$LoadingBar.finish()">finish</button> |
        <button @click="$LoadingBar.error()">error</button> |
        <button @click="$LoadingBar.warning()">waring</button> |
    </div>
</template>
