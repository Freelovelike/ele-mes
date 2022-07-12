import { NextPage } from "next"
import Image from "next/image"
import Router from "next/router"
import React, { FormEvent, useId, useState } from "react"
import styled from "styled-components"
import LogoSvg from "../assets/Image/Logo.svg"
import { useLoginMutation } from "../src/generated/graphql"
interface loginProps {}

const login: NextPage<loginProps> = () => {
  const username = useId()
  const password = useId()
  const [LoginInput, setLoginInput] = useState<{
    username: string
    password: string
  }>({
    username: "",
    password: "",
  })
  const [, Login] = useLoginMutation()

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    setLoginInput({
      ...LoginInput,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }
  const LoginSubmit = async (e) => {
    if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
      const { data, error } = await Login({
        data: LoginInput,
      })
      if (data) {
        const { login } = data
        if (login.data) {
          Router.push("/")
        }
        if (login.errors) {
          console.error(login.errors)
        }
      }
      if (error) console.error(error)
    }
  }

  return (
    <Container>
      <form>
        <Image src={LogoSvg} width={270} height={87} />
        <Label htmlFor={username}>
          <InputName>Username</InputName>
          <Input
            id={username}
            name='username'
            onInput={onInput}
            onKeyDown={LoginSubmit}
          />
        </Label>
        <Label htmlFor={password}>
          <InputName>Password</InputName>
          <Input
            id={password}
            name='password'
            onInput={onInput}
            onKeyDown={LoginSubmit}
            type='password'
          />
        </Label>
        <Submit onClick={LoginSubmit}>Log In</Submit>
      </form>
    </Container>
  )
}

export default login

const Container = styled.div`
  width: 100%;
  height: 98vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Label = styled.label`
  width: 300px;
  display: block;
  height: 55px;
  margin-bottom: 15px;
`
const InputName = styled.p`
  margin-bottom: 5px;
`
const Input = styled.input`
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  box-sizing: border-box;
  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%);
  }
`
const Submit = styled.div`
  width: 100%;
  padding: 10px 16px;
  width: 50px;
  height: 24px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
  background-color: #337ab7;
  border-color: #2e6da4;
  color: #fff;
  cursor: pointer;
`
