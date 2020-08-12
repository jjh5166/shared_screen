import { TapeContainer, CastCredit } from "./styled";


const CastTape = ({ cast }: any) => {
  return (
    <TapeContainer>
      {
        cast.map((member: any, i: number) => (
          <CastCredit key={member.role + i}>
            <div>{member.role}</div>
            <div>{member.name}</div>
          </CastCredit>
        )
        )}
    </TapeContainer>
  )
};

export default CastTape;