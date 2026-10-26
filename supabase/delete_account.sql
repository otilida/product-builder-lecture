-- 회원 탈퇴용 함수. Supabase 대시보드 > SQL Editor 에서 한 번 실행하세요.
-- 브라우저(anon 키)로는 사용자를 직접 삭제할 수 없으므로, "로그인한 본인"만
-- 자기 계정을 지울 수 있는 함수를 만들어 sb.rpc("delete_my_account")로 호출합니다.
-- service_role 키는 코드에 넣지 않습니다.

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
